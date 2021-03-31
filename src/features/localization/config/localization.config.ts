import { NstackInstance } from "@nstack-io/javascript-sdk";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { ENV } from "@app/constants/env";

import { DEFAULT_NS, INITIAL_LANG } from "../constants/localization.constants";
import { NSTACK_ENV } from "../constants/localization.env";

export const nstackClient = new NstackInstance({
  appId: NSTACK_ENV.NSTACK_APP_ID,
  apiKey: NSTACK_ENV.NSTACK_API_KEY,
  version: ENV.VERSION,
  initialLanguage: INITIAL_LANG,
  meta: `web;${ENV.NODE_ENV}`,
});

i18next.use(initReactI18next).init({
  fallbackLng: INITIAL_LANG,
  lng: INITIAL_LANG,
  interpolation: {
    escapeValue: false,
  },
  defaultNS: DEFAULT_NS,
  resources: {
    // TODO: Move translation to nstack
    "en-EN": {
      translation: {
        default: {
          notFoundTitle: "404 - Not found",
          notFoundText: "The page you were looking for was not found.",
          restrictAccessTitle: "Access denied",
          restrictAccessText:
            "Sorry! You don't have necessary permission to access this page!",
          columnAction: "Action",
          deleteTitle: "Delete",
          confirmDeleteTitle: "Are you sure to delete this?",
          confirmDeleteYes: "Yes",
          confirmDeleteNo: "No",
          duplicateTitle: "Duplicate",
          editTitle: "Edit",
          saveTitle: "Save",
          cancelTitle: "Cancel",
          moreTitle: "More",
        },
        home: {
          navigationTitle: "Home",
          title: "Home",
          text: "Content",
        },
        settings: {
          navigationTitle: "Settings",
          groupUsersSettings: "Group Title",
        },
        settingsProjects: {
          navigationTitle: "Projects",
          title: "Projects",
          text: "Content",
        },
        settingsUsers: {
          navigationTitle: "Users",
          title: "Users",
          text: "Content",
          columnName: "Name",
          columnLastName: "Last Name",
          editUserTitle: "Edit user",
          addUserTitle: "Add user",
          buttonAddUser: "Add user",
          menuDuplicate: "Duplicate user",
          editUserRole: "Edit user role",
          buttonUserRole: "change role",
        },
      },
    },
  },
});

export default i18next;
