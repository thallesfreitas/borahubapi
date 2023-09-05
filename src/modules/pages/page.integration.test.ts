/* eslint-disable @typescript-eslint/no-shadow */
import { test } from 'tap';
import build from '../../app';

test('/pages/:pageSlug route', async t => {
  const app = build();

  t.test('get page infos', async t => {
    // Arrange

    // Act
    const response = await app.inject({
      method: 'GET',
      url: '/pages/work-in',
    });

    const payload = response.json();

    const expectedResponse = {
      status: 'success',
      data: {
        pageTitle: 'John Richard - WorkIn',
        title: 'Home Office (WorkIn)',
        description:
          'Amet ac, massa nulla cursus mauris augue. Enim mauris in eu dictum eu nullam. Senectus dui purus pulvinar ipsum gravida dolor enim. In donec id bibendum dignissim sit. Sit neque sit.',
      },
    };

    t.equal(response.statusCode, 200, 'status code is 200');
    t.same(payload, expectedResponse, 'page infos are returned');

    t.end();
  });

  t.teardown(() => app.close());
});
