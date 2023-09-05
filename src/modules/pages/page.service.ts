import * as PageRepository from './page.repository';

export const getPage = (pageSlug: string) => PageRepository.getPage(pageSlug);
