/*
 * Copyright 2021 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  ILogoutHandler,
  IStorageUtility,
} from "@rubensworks/solid-client-authn-core";
import { jest } from "@jest/globals";
import { clear } from "../../sessionInfo/SessionInfoManager";

export const LogoutHandlerMock: jest.Mocked<ILogoutHandler> = {
  canHandle: jest.fn(async (_localUserId: string) => true),
  handle: jest.fn(async (_localUserId: string) => {
    /* Do nothing */
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const mockLogoutHandler = (
  storageUtility: IStorageUtility
): jest.Mocked<ILogoutHandler> => {
  return {
    canHandle: jest.fn(async (_localUserId: string) => true),
    handle: jest.fn(async (localUserId: string) => {
      return clear(localUserId, storageUtility);
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
};
