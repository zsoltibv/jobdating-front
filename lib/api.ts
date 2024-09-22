const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getJobsByCategory(categories) {
  const data = await fetchAPI(
    `
    query GET_JOBS_BY_CATEGORY($categories: [String]) {
      jobs(
        where: {
          taxQuery: {
            relation: OR,
            taxArray: [
              {
                terms: $categories,
                taxonomy: JOBCATEGORY,
                operator: IN,
                field: SLUG
              },
            ]
          }
        }
      ){
        edges{
          cursor
          node{
            id
            date
            jobFields {
                description
                name
              }
              jobCategories {
                nodes {
                  name
                }
              }
              locations {
                nodes {
                  name
                }
              }
              workTypes {
                nodes {
                  name
                }
              }
          }
        }
      }
    }
    `,
    {
      variables: { categories },
    }
  );
  return data.jobs.edges.map((edge) => edge.node);
}

export async function getJobById(id) {
  const data = await fetchAPI(
    `
    query GET_JOB_BY_ID($id: ID!) {
      job(id: $id) {
        jobFields {
          name
          description
        }
        jobCategories {
          nodes {
            name
          }
        }
        locations {
          nodes {
            name
          }
        }
        workTypes {
          nodes {
            name
          }
        }
        id
      }
    }
  `,
    {
      variables: { id },
    }
  );

  return data.job;
}

export async function getAllJobWorkTypes() {
  const data = await fetchAPI(`
    query GET_JOB_WORKTYPES {
      workTypes {
        edges {
          node {
            name
          }
        }
      }
    }
  `);

  return data.workTypes.edges.map((edge) => edge.node);
}

export async function getAllJobLocations() {
  const data = await fetchAPI(`
    query GET_JOB_LOCATIONS {
      locations {
        nodes {
          name
        }
      }
    }
  `);

  return data.locations.nodes;
}

export async function getAllJobCategories() {
  const data = await fetchAPI(`
    query GET_JOB_CATEGORIES {
      jobCategories {
        edges {
          node {
            name
          }
        }
      }
    }`);
  return data.jobCategories.edges.map((edge) => edge.node);
}

export async function getAllJobs() {
  const data = await fetchAPI(`
    query GET_JOBS{
      jobs(first:100) {
        nodes {
          jobFields {
            description
            name
          }
          jobCategories {
            nodes {
              name
            }
          }
          locations {
            nodes {
              name
            }
          }
          workTypes {
            nodes {
              name
            }
          }
          id
          date
          slug
        }
      }
    }
  `);
  return data.jobs.nodes;
}

export async function getLatestJobs(jobCount) {
  const data = await fetchAPI(`
    query GET_JOBS {
      jobs(last: ${jobCount}) {
        nodes {
          jobFields {
            description
            name
          }
          jobCategories {
            nodes {
              name
            }
          }
          locations {
            nodes {
              name
            }
          }
          workTypes {
            nodes {
              name
            }
          }
          id
          date
        }
      }
    }
  `);
  return data.jobs.nodes;
}

export async function getMenuItemsByMenuName() {
  const data = await fetchAPI(
    `
    query GET_MENU_BY_NAME {
      menu(id: "Primary", idType: NAME) {
        count
        id
        databaseId
        name
        slug
        menuItems(first: 50) {
          nodes {
            id
            databaseId
            title
            url
            cssClasses
            description
            label
            linkRelationship
            target
            parentId
          }
        }
      }
    }`
  );
  return data.menu.menuItems.nodes;
}

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}
