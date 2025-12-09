import { test as base, mergeTests, request } from '@playwright/test';
import { test as pageObjectFixture } from './page-object-fixture';
import { test as apiRequestFixture } from '../api/api-request-fixture';
import { test as testDataFixture } from '../../test-data/test-data-fixture';


const test = mergeTests(pageObjectFixture, apiRequestFixture, testDataFixture);

const expect = base.expect;
export { test, expect, request };
