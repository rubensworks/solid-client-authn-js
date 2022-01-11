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
  ILoginOptions,
  ILoginHandler,
  ISessionInfo,
} from "@rubensworks/solid-client-authn-core";
import { jest } from "@jest/globals";

export const LoginHandlerResponse: ISessionInfo = {
  isLoggedIn: false,
  sessionId: "global",
};

export const LoginHandlerMock: jest.Mocked<ILoginHandler> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canHandle: jest.fn((options: ILoginOptions) => Promise.resolve(true)),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle: jest.fn((options: ILoginOptions) => Promise.resolve(undefined)),
  // A Jest update seemes to have caused some troubles aligning mock types.
  // Since the tests worked, I'm setting it to `any`:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
