/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { schema } from '@kbn/config-schema';
import {
  IRouter,
  IKibanaResponse,
  ResponseError,
  RequestHandlerContext,
  KibanaRequest,
  KibanaResponse,
} from '../../../../src/core/server';
import { API_PREFIX } from '../../common';
import { dataReportSchema, reportSchema } from '../model';
import { parseEsErrorResponse } from './utils/helpers';
import { metaData, getSelectedFields } from './utils/dataReportHelpers';
import { REPORT_STATE } from './utils/constants';

const axios = require('axios');

export default function (router: IRouter) {
  router.post(
    {
      path: `${API_PREFIX}/report`,
      validate: {
        body: reportSchema,
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IKibanaResponse<any | ResponseError>> =>
      exportCsv(context, request, response)
  );
}

function exportCsv(
  context: RequestHandlerContext,
  request: KibanaRequest,
  response: KibanaResponse
) {
  return response.custom({
    statusCode: 200,
    body: 'No data in Elasticsearch.',
  });
}
