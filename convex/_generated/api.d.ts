/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as certificates from "../certificates.js";
import type * as events from "../events.js";
import type * as gallery from "../gallery.js";
import type * as http from "../http.js";
import type * as magazines from "../magazines.js";
import type * as notifications from "../notifications.js";
import type * as router from "../router.js";
import type * as userProfiles from "../userProfiles.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  certificates: typeof certificates;
  events: typeof events;
  gallery: typeof gallery;
  http: typeof http;
  magazines: typeof magazines;
  notifications: typeof notifications;
  router: typeof router;
  userProfiles: typeof userProfiles;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
