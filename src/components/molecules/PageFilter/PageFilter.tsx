import React, { memo } from "react";

import { Form, FormProps, Row, Col, Button } from "antd";
import _mapValues from "lodash/mapValues";
import { useTranslation } from "react-i18next";

import useSearchParams from "@app/hooks/useSearchParams";

import FilterItem, {
  FilterItemCheckbox,
} from "./components/FilterItem/FilterItem";

interface PageFilterProps extends FormProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  hasReset?: boolean;
  hasSubmit?: boolean;
  onApply?: () => void;
  resetText?: string;
  submitText?: string;
}

const PageFilter = ({
  children,
  columns = 4,
  hasReset,
  hasSubmit,
  onApply,
  resetText,
  submitText,
  ...rest
}: PageFilterProps) => {
  const { t } = useTranslation();
  const { search, updateSearchParams } = useSearchParams();
  const [filterForm] = Form.useForm();
  const form = rest.form ?? filterForm;

  const handleSubmit = (values: Record<string, unknown>) => {
    /**
     * If we have field that has a value of false, then we do
     * not want it to be passed to the URL, hence why we set it
     * to undefined. If we pass the false boolean value to the
     * search params of the URL, we will get a string value
     * returned, and the checkbox for example will interpret
     * that as a truthy value and "check" the checkbox. We could
     * pass it, but then we need to decode it before setting initial
     * values.
     */
    Object.keys(values).forEach(key => {
      if (values[key] === false) {
        values[key] = undefined;
      }
    });

    updateSearchParams({ ...values });
    onApply?.();
  };

  const handleSelect = (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>
  ) => {
    handleSubmit({ ...allValues });
  };

  const handleReset = () => {
    const resetFields = _mapValues(form.getFieldsValue(), () => undefined);
    updateSearchParams({ page: 1, ...resetFields });
  };

  return (
    <Form
      {...rest}
      form={form}
      initialValues={search}
      onValuesChange={!hasSubmit ? handleSelect : undefined}
      onFinish={handleSubmit}
    >
      <Row gutter={24}>
        {React.Children.map(children, child => (
          <Col xs={24} sm={12} lg={24 / columns}>
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

export default memo(PageFilter);
export { FilterItem, FilterItemCheckbox };