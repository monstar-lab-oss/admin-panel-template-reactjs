/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useCallback, useEffect, useState } from "react";

import { Form, FormProps, Row, Col, Button } from "antd";
import _mapValues from "lodash/mapValues";
import { useTranslation } from "react-i18next";

import useSearchParams from "@app/hooks/useSearchParams";

import FilterItem, {
  FilterItemCheckbox,
} from "./components/FilterItem/FilterItem";
import { parseFilters } from "./helpers/pagefilter.helpers";
import { ParseFiltersProps } from "./types/pagefilter.types";

interface PageFilterProps<T = {}> extends FormProps, ParseFiltersProps<T> {
  /**
   * Each child should be wrapped in a FilterItem,
   * or FilterItemCheckbox, component in order for
   * the filter to pick up on changes to a given
   * field.
   */
  children: React.ReactNode;
  /**
   * The amount of columns to use on desktop, or from
   * the "lg" breakpoint. Alternatively if you need your
   * filters to be layed out in a vertical manner, you
   * can simply set columns to 1;
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Outputs a reset button that resets the filters.
   */
  hasReset?: boolean;
  /**
   * Outputs a submit / apply button, which means that the
   * filters will no longer trigger on change, but rather on
   * submit.
   */
  hasSubmit?: boolean;
  /**
   * Function to call when all filters have been reset by a reset button.
   */
  onReset?: () => void;
  /**
   * Function to call once filters have been submitted. This of
   * course depends on whether or not you have a submit / apply
   * button, or triggering the submit on filter change.
   */
  onSubmit?: () => void;
  /**
   * Text for the reset button. Falls back to the default reset translation.
   */
  resetText?: string;
  /**
   * Text for the submit / apply button. Falls back to the default apply translation.
   */
  submitText?: string;
}

const PageFilter = <T extends {}>({
  children,
  columns = 4,
  hasReset,
  hasSubmit,
  onReset,
  onSubmit,
  parseBoolean = true,
  parseDates,
  parseNumbers,
  resetText,
  submitText,
  ...rest
}: PageFilterProps<T>) => {
  const { t } = useTranslation();
  const { search, updateSearchParams } = useSearchParams();

  const [form] = Form.useForm(rest.form);

  const parseSearch = useCallback(
    () =>
      parseFilters<T>({
        filters: search,
        parseBoolean,
        parseDates,
        parseNumbers,
      }),
    [parseBoolean, parseDates, parseNumbers, search]
  );

  const [data, setData] = useState(
    parseBoolean || parseDates || parseNumbers ? parseSearch() : search
  );
  useEffect(() => {
    if (parseBoolean || parseDates || parseNumbers) {
      setData(parseSearch());
    }
  }, [parseBoolean, parseDates, parseNumbers, parseSearch, search]);

  // Submit filters, update search params.
  const handleSubmit = (values: Record<string, unknown>) => {
    updateSearchParams({ ...values });
    onSubmit?.();
  };

  // Submit on field change.
  const handleChange = (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>
  ) => {
    handleSubmit({ ...allValues });
  };

  // Reset filters, and clear search params.
  const handleReset = () => {
    const resetFields = _mapValues(form.getFieldsValue(), () => undefined);
    updateSearchParams({ page: undefined, ...resetFields });
    onReset?.();
  };

  return (
    <Form
      initialValues={data}
      {...rest}
      form={form}
      onValuesChange={!hasSubmit ? handleChange : undefined}
      onFinish={handleSubmit}
    >
      <Row gutter={24}>
        {React.Children.map(children, child => (
          <Col xs={24} sm={columns > 1 ? 12 : 24} lg={24 / columns}>
            {child}
          </Col>
        ))}
      </Row>
      {(hasReset || hasSubmit) && (
        <Row gutter={24}>
          {hasReset && (
            <Col>
              <Form.Item>
                <Button htmlType="reset" onClick={handleReset}>
                  {resetText ?? t("default.reset")}
                </Button>
              </Form.Item>
            </Col>
          )}
          {hasSubmit && (
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {submitText ?? t("default.apply")}
                </Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      )}
    </Form>
  );
};

export default memo(PageFilter) as typeof PageFilter;
export { FilterItem, FilterItemCheckbox };
