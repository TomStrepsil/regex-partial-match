/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


// Named capture groups can be `undefined` when an optional group does not participate
// in the match. The upstream lib types the index signature value as `string`, which is
// incorrect. See: https://github.com/microsoft/TypeScript/issues/32098
interface RegExpMatchArray {
    groups?: {
        [key: string]: string | undefined;
    };
}

interface RegExpExecArray {
    groups?: {
        [key: string]: string | undefined;
    };
}

interface RegExp {
    /**
     * Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression.
     * Default is false. Read-only.
     */
    readonly dotAll: boolean;
}
