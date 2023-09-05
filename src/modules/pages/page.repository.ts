export interface PageObject {
  [key: string]: {
    pageTitle: string;
    title: string;
    description: string;
  };
}

export const getPage = async (pageSlug: string) => {
  const obj: PageObject = {
    'work-in': {
      pageTitle: 'John Richard - WorkIn',
      title: 'Home Office (WorkIn)',
      description:
        'Amet ac, massa nulla cursus mauris augue. Enim mauris in eu dictum eu nullam. Senectus dui purus pulvinar ipsum gravida dolor enim. In donec id bibendum dignissim sit. Sit neque sit.',
    },
  };

  // eslint-disable-next-line security/detect-object-injection
  return obj[pageSlug] ?? {};
};
