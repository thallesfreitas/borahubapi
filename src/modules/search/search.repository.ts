/* eslint-disable indent */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  $Enums,
  Areas,
  Candidate,
  Category,
  Freelancer,
  Jobs,
  ServiceProvider,
  Tags,
  User,
} from '@prisma/client';
import db from '../../lib/dbClient';
import { SearchQuery } from './search.model';

export interface FreelancerWithIncludes extends Freelancer {
  categories: Category;
  tags: Tags;
  areas: Areas;
}
export interface FreelancersSearch extends User {
  freelancer: FreelancerWithIncludes;
}

export interface ServiceProviderWithIncludes extends ServiceProvider {
  categories: Category;
  tags: Tags;
  areas: Areas;
}
export interface ServiceProvidersSearch extends User {
  serviceProvider: ServiceProviderWithIncludes;
}

export interface CandidateWithIncludes extends Candidate {
  categories: Category;
  tags: Tags;
  areas: Areas;
}
export interface CandidatesSearch extends User {
  candidate: CandidateWithIncludes;
}

export interface JobSearch extends Jobs {
  tags: Tags;
  createdById: User;
}

export interface SearchReturn {
  jobs: JobSearch[];
  candidates: CandidatesSearch[];
  serviceProvider: ServiceProvidersSearch[];
  freelancer: FreelancersSearch[];
}

const returnJobs = async (data: SearchQuery) => {
  const { keyword, limit, skip, tag, category, area, isActive = true } = data;
  const keywordfix = keyword?.split(' ').join(' <-> ');
  const tagfix = tag?.split(' ').join(' | ');
  const categoryfix = category?.split(' ').join(' | ');
  const areafix = area?.split(' ').join(' | ');
  console.log();
  let result = await db.jobs.findMany({
    where: {
      title: {
        contains: keywordfix,
      },
      description: {
        contains: keywordfix,
      },
      deletedAt: null,
      isActive: true,

      // categories: {
      //   some: {
      //     category: {
      //       name: {
      //         search: categoryfix,
      //       },
      //     },
      //   },
      // },

      // tags: {
      //   some: {
      //     tags: {
      //       name: {
      //         search: tagfix,
      //       },
      //     },
      //   },
      // },

      // areas: {
      //   some: {
      //     areas: {
      //       name: {
      //         search: areafix,
      //       },
      //     },
      //   },
      // },
    },

    include: {
      createdById: {
        select: {
          name: true,
        },
      },
      updatedById: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          tags: {
            select: {
              name: true,
            },
          },
        },
      },
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      areas: {
        select: {
          areas: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
      // _relevance: {
      //   fields: ['title'],
      //   search: 'database',
      //   sort: 'asc',
      // },
    },
  });

  if (result.length === 0) {
    result = await db.jobs.findMany({
      where: {
        deletedAt: null,
        isActive,

        categories: {
          some: {
            category: {
              name: {
                search: keywordfix,
              },
            },
          },
        },
      },

      include: {
        createdById: {
          select: {
            name: true,
          },
        },
        updatedById: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            tags: {
              select: {
                name: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        areas: {
          select: {
            areas: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'desc',
        // },
      },
    });
  }
  if (result.length === 0) {
    result = await db.jobs.findMany({
      where: {
        deletedAt: null,
        isActive,

        tags: {
          some: {
            tags: {
              name: {
                search: keywordfix,
              },
            },
          },
        },
      },

      include: {
        createdById: {
          select: {
            name: true,
          },
        },
        updatedById: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            tags: {
              select: {
                name: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        areas: {
          select: {
            areas: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'desc',
        // },
      },
    });
  }
  if (result.length === 0) {
    result = await db.jobs.findMany({
      where: {
        deletedAt: null,
        isActive,

        areas: {
          some: {
            areas: {
              name: {
                search: keywordfix,
              },
            },
          },
        },
      },

      include: {
        createdById: {
          select: {
            name: true,
          },
        },
        updatedById: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            tags: {
              select: {
                name: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        areas: {
          select: {
            areas: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'desc',
        // },
      },
    });
  }

  return result;
};

const returnCandidates = async (data: SearchQuery) => {
  const { keyword, limit, skip, tag, category, area, isActive = true } = data;
  const keywordfix = keyword?.split(' ').join(' <-> ');
  const tagfix = tag?.split(' ').join(' | ');
  const categoryfix = category?.split(' ').join(' | ');
  const areafix = area?.split(' ').join(' | ');
  let result = await db.user.findMany({
    skip,
    take: limit,
    include: {
      candidate: {
        include: {
          areas: {
            select: {
              areas: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          //
          categories: {
            select: {
              category: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          //
          tags: {
            select: {
              tags: {
                select: {
                  name: true,
                },
              },
            },
          },
          //
        },
      },
    },
    where: {
      deletedAt: null,
      isActive,
      candidate: {
        description: {
          contains: keywordfix,
        },

        // categories: {
        //   some: {
        //     category: {
        //       name: {
        //         contains: categoryfix,
        //       },
        //     },
        //   },
        // },

        // tags: {
        //   some: {
        //     tags: {
        //       name: {
        //         contains: tagfix,
        //       },
        //     },
        //   },
        // },

        // areas: {
        //   some: {
        //     areas: {
        //       name: {
        //         contains: areafix,
        //       },
        //     },
        //   },
        // },
      },
    },
    orderBy: {
      createdAt: 'desc',
      // _relevance: {
      //   fields: ['title'],
      //   search: 'database',
      //   sort: 'asc',
      // },
    },
  });
  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        candidate: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        candidate: {
          tags: {
            some: {
              tags: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }

  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        candidate: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        candidate: {
          areas: {
            some: {
              areas: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }

  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        candidate: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        candidate: {
          categories: {
            some: {
              category: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }
  return result;
};
const returnServiceProvider = async (data: SearchQuery) => {
  const { keyword, limit, skip, tag, category, area, isActive = true } = data;
  const keywordfix = keyword?.split(' ').join(' <-> ');
  const tagfix = tag?.split(' ').join(' | ');
  const categoryfix = category?.split(' ').join(' | ');
  const areafix = area?.split(' ').join(' | ');
  let result = await db.user.findMany({
    skip,
    take: limit,
    include: {
      serviceProvider: {
        include: {
          areas: {
            select: {
              areas: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          //
          categories: {
            select: {
              category: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          //
          tags: {
            select: {
              tags: {
                select: {
                  name: true,
                },
              },
            },
          },
          //
        },
      },
    },
    where: {
      deletedAt: null,
      isActive,
      serviceProvider: {
        description: {
          contains: keywordfix,
        },

        categories: {
          some: {
            category: {
              name: {
                contains: categoryfix,
              },
            },
          },
        },

        tags: {
          some: {
            tags: {
              name: {
                contains: tagfix,
              },
            },
          },
        },

        areas: {
          some: {
            areas: {
              name: {
                contains: areafix,
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
      // _relevance: {
      //   fields: ['title'],
      //   search: 'database',
      //   sort: 'asc',
      // },
    },
  });
  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        serviceProvider: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        serviceProvider: {
          tags: {
            some: {
              tags: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }

  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        serviceProvider: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        serviceProvider: {
          areas: {
            some: {
              areas: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }

  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        serviceProvider: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        serviceProvider: {
          categories: {
            some: {
              category: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }
  return result;
};

const returnFreelancer = async (data: SearchQuery) => {
  const { keyword, limit, skip, tag, category, area, isActive = true } = data;
  const keywordfix = keyword?.split(' ').join(' <-> ');
  const tagfix = tag?.split(' ').join(' | ');
  const categoryfix = category?.split(' ').join(' | ');
  const areafix = area?.split(' ').join(' | ');
  let result = await db.user.findMany({
    skip,
    take: limit,
    include: {
      freelancer: {
        include: {
          areas: {
            select: {
              areas: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          //
          categories: {
            select: {
              category: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          //
          tags: {
            select: {
              tags: {
                select: {
                  name: true,
                },
              },
            },
          },
          //
        },
      },
    },
    where: {
      deletedAt: null,
      isActive,
      freelancer: {
        description: {
          contains: keywordfix,
        },

        categories: {
          some: {
            category: {
              name: {
                contains: categoryfix,
              },
            },
          },
        },

        tags: {
          some: {
            tags: {
              name: {
                contains: tagfix,
              },
            },
          },
        },

        areas: {
          some: {
            areas: {
              name: {
                contains: areafix,
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
      // _relevance: {
      //   fields: ['title'],
      //   search: 'database',
      //   sort: 'asc',
      // },
    },
  });
  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        freelancer: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        freelancer: {
          tags: {
            some: {
              tags: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }

  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        freelancer: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        freelancer: {
          areas: {
            some: {
              areas: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }

  if (result.length === 0) {
    result = await db.user.findMany({
      skip,
      take: limit,
      include: {
        freelancer: {
          include: {
            areas: {
              select: {
                areas: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    type: true,
                    name: true,
                  },
                },
              },
            },
            tags: {
              select: {
                tags: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        deletedAt: null,
        isActive,
        freelancer: {
          categories: {
            some: {
              category: {
                name: {
                  search: keywordfix,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        // _relevance: {
        //   fields: ['title'],
        //   search: 'database',
        //   sort: 'asc',
        // },
      },
    });
  }
  return result;
};

// export const search = async (data: SearchQuery) => {
//   const { keyword, limit, skip, tag, category, area, isActive = true } = data;
//   // const keywordfix = keyword?.split(' ').join(' <-> ');
//   const keywordfix = keyword?.split(' ').join(' | ');
//   const tagfix = tag?.split(' ').join(' | ');
//   const categoryfix = category?.split(' ').join(' | ');
//   const areafix = area?.split(' ').join(' | ');
//   console.log('keywordfix');
//   console.log('keywordfix');
//   console.log('keywordfix');
//   console.log('keywordfix');
//   console.log('keywordfix');
//   console.log('keywordfix');
//   console.log('keywordfix');
//   console.log('keywordfix');
//   console.log(keywordfix);
//   const [jobs, user] = await db.$transaction([
//     db.jobs.findMany({
//       skip,
//       take: limit,
//       orderBy: {
//         _relevance: {
//           fields: ['title'],
//           search: 'database',
//           sort: 'desc',
//         },
//       },
//       where: {
//         title: {
//           search: keywordfix,
//         },
//         description: {
//           search: keywordfix,
//         },
//         deletedAt: null,
//         isActive,

//         categories: {
//           some: {
//             category: {
//               name: {
//                 search: categoryfix,
//               },
//             },
//           },
//         },

//         tags: {
//           some: {
//             tags: {
//               name: {
//                 search: tagfix,
//               },
//             },
//           },
//         },

//         areas: {
//           some: {
//             areas: {
//               name: {
//                 search: areafix,
//               },
//             },
//           },
//         },
//       },

//       include: {
//         createdById: {
//           select: {
//             name: true,
//           },
//         },
//         updatedById: {
//           select: {
//             name: true,
//           },
//         },
//         tags: {
//           select: {
//             tags: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//         categories: {
//           select: {
//             category: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//         areas: {
//           select: {
//             areas: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     }),

//     db.user.findMany({
//       skip,
//       take: limit,
//       orderBy: {
//         _relevance: {
//           fields: ['name'],
//           search: 'database',
//           sort: 'desc',
//         },
//       },

//       include: {
//         candidate: {
//           include: {
//             areas: {
//               select: {
//                 areas: {
//                   select: {
//                     type: true,
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//             categories: {
//               select: {
//                 category: {
//                   select: {
//                     type: true,
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//             tags: {
//               select: {
//                 tags: {
//                   select: {
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//           },
//         },
//         serviceProvider: {
//           include: {
//             areas: {
//               select: {
//                 areas: {
//                   select: {
//                     type: true,
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//             categories: {
//               select: {
//                 category: {
//                   select: {
//                     type: true,
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//             tags: {
//               select: {
//                 tags: {
//                   select: {
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//           },
//         },
//         freelancer: {
//           include: {
//             areas: {
//               select: {
//                 areas: {
//                   select: {
//                     type: true,
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//             categories: {
//               select: {
//                 category: {
//                   select: {
//                     type: true,
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//             tags: {
//               select: {
//                 tags: {
//                   select: {
//                     name: true,
//                   },
//                 },
//               },
//             },
//             //
//           },
//         },
//       },

//       where: {
//         // deletedAt: null,
//         // isActive,
//         candidate: {
//           description: {
//             contains: keywordfix,
//           },

//           // categories: {
//           //   some: {
//           //     category: {
//           //       name: {
//           //         search: categoryfix,
//           //       },
//           //     },
//           //   },
//           // },

//           // tags: {
//           //   some: {
//           //     tags: {
//           //       name: {
//           //         search: tagfix,
//           //       },
//           //     },
//           //   },
//           // },

//           // areas: {
//           //   some: {
//           //     areas: {
//           //       name: {
//           //         search: areafix,
//           //       },
//           //     },
//           //   },
//           // },
//         },
//         serviceProvider: {
//           description: {
//             search: keywordfix,
//           },

//           // categories: {
//           //   some: {
//           //     category: {
//           //       name: {
//           //         search: categoryfix,
//           //       },
//           //     },
//           //   },
//           // },

//           // tags: {
//           //   some: {
//           //     tags: {
//           //       name: {
//           //         search: tagfix,
//           //       },
//           //     },
//           //   },
//           // },

//           // areas: {
//           //   some: {
//           //     areas: {
//           //       name: {
//           //         search: areafix,
//           //       },
//           //     },
//           //   },
//           // },
//         },
//         freelancer: {
//           description: {
//             search: keywordfix,
//           },

//           // categories: {
//           //   some: {
//           //     category: {
//           //       name: {
//           //         search: categoryfix,
//           //       },
//           //     },
//           //   },
//           // },

//           // tags: {
//           //   some: {
//           //     tags: {
//           //       name: {
//           //         search: tagfix,
//           //       },
//           //     },
//           //   },
//           // },

//           // areas: {
//           //   some: {
//           //     areas: {
//           //       name: {
//           //         search: areafix,
//           //       },
//           //     },
//           //   },
//           // },
//         },
//       },
//     }),
//   ]);
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log('user');
//   console.log(user);
//   return {
//     jobs,
//     candidates: user,
//     serviceProvider: user,
//     freelancer: user,
//   };
// };
export const search = async (data: SearchQuery) => {
  let jobsresult: ({
    tags: { tags: { name: string } }[];
    createdById: { name: string } | null;
    updatedById: { name: string } | null;
  } & {
    id: number;
    title: string;
    company: string | null;
    email: string | null;
    phone: string | null;
    avatar: string | null;
    banner: string | null;
    experience: string | null;
    description: string | null;
    descriptionCompany: string | null;
    contractMode: string[] | null;
    affirmative: string[] | null;
    modelOfWork: string[] | null;
    seniority: string[] | null;
    travel: string[] | null;
    city: string | null;
    state: string | null;
    salary: string[];
    slug: string;
    isActive: boolean;
    isPublished: boolean;
    isApproved: boolean;
    extra: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: number | null;
    updatedBy: number | null;
    deletedBy: number | null;
  })[] = [];

  let candidatesresult: ({
    candidate:
      | ({ areas: { areas: { name: string; type: $Enums.ProfileType } }[] } & {
          id: number;
          uuid: string;
          description: string | null;
          avatar: string | null;
          banner: string | null;
          link: string | null;
          salary: string[];
          contractMode: string[];
          affirmative: string[] | null;
          seniority: string[] | null;
          travel: string[] | null;

          actualRole: string | null;
          city: string | null;
          state: string | null;
          extra: string | null;
          workMode: string[];
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date | null;
          userId: number;
        })
      | null;
  } & {
    id: number;
    uuid: string;
    // stripe_id: string | null;
    customerMP: string | null;
    email: string;
    phone: string;
    optin: boolean;
    name: string;
    slug: string;
    indicatedBy: string | null;
    mainPortfolio: string | null;
    password: string | null;
    isActive: boolean;
    isPhoneConfirmed: boolean;
    isEmailConfirmed: boolean;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  })[] = [];

  let serviceresult: ({
    serviceProvider:
      | ({ areas: { areas: { name: string; type: $Enums.ProfileType } }[] } & {
          id: number;
          uuid: string;
          description: string | null;
          avatar: string | null;
          banner: string | null;
          link: string | null;
          salary: string[];
          actualRole: string | null;
          city: string | null;
          state: string | null;
          extra: string | null;
          workMode: string[];
          contractMode: string[] | null;
          seniority: string[] | null;
          travel: string[] | null;

          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date | null;
          userId: number;
        })
      | null;
  } & {
    id: number;
    uuid: string;
    // stripe_id: string | null;
    customerMP: string | null;
    email: string;
    phone: string;
    optin: boolean;
    name: string;
    slug: string;
    indicatedBy: string | null;
    mainPortfolio: string | null;
    password: string | null;
    isActive: boolean;
    isPhoneConfirmed: boolean;
    isEmailConfirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  })[] = [];

  let freelancerresult: ({
    freelancer:
      | ({ areas: { areas: { name: string; type: $Enums.ProfileType } }[] } & {
          id: number;
          uuid: string;
          description: string | null;
          avatar: string | null;
          banner: string | null;
          link: string | null;
          salary: string[];
          contractMode: string[] | null;
          seniority: string[] | null;
          travel: string[] | null;

          actualRole: string | null;
          city: string | null;
          state: string | null;
          extra: string | null;
          workMode: string[];
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date | null;
          userId: number;
        })
      | null;
  } & {
    id: number;
    uuid: string;
    // stripe_id: string | null;
    customerMP: string | null;
    email: string;
    phone: string;
    optin: boolean;
    name: string;
    slug: string;
    indicatedBy: string | null;
    mainPortfolio: string | null;
    password: string | null;
    isActive: boolean;
    isPhoneConfirmed: boolean;
    isEmailConfirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  })[] = [];

  switch (data.filter) {
    case 'jobs':
      jobsresult = await returnJobs(data);
      break;
    case 'candidates':
      candidatesresult = await returnCandidates(data);
      break;
    case 'services':
      serviceresult = await returnServiceProvider(data);
      break;
    case 'freelancer':
      freelancerresult = await returnFreelancer(data);
      break;
    default:
      jobsresult = await returnJobs(data);
      candidatesresult = await returnCandidates(data);
      serviceresult = await returnServiceProvider(data);
      freelancerresult = await returnFreelancer(data);
      break;
  }

  return {
    jobs: jobsresult,
    candidates: candidatesresult,
    serviceProvider: serviceresult,
    freelancer: freelancerresult,
  };
};
