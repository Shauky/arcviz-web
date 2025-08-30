// wantedly-api.js
// A JavaScript module reflecting Wantedly's public API features and inferred internal structure.
// Based on Wantedly Open API for embeds and GraphQL mentions in engineering handbook.
// Note: Public API is embed-focused; no official HTTP endpoints are documented for direct calls.
// Use this as a utility for generating embeds or client-side queries.

const WANTEDLY_BASE_URL = 'https://www.wantedly.com'; // Base for site links; adjust for regional (e.g., sg.wantedly.com)
const OPEN_API_EMAIL = 'open-api@wantedly.com'; // For partnership inquiries

/**
 * Generates HTML code for embedding a Wantedly company story.
 * @param {string} companyId - The Wantedly company ID or slug.
 * @param {object} options - Optional params like width, height.
 * @returns {string} HTML embed code.
 */
function generateEmbeddedStory(companyId, options = {}) {
  // Inferred from docs: Embeds use a script or iframe; actual code obtained via form on site.
  // Placeholder based on typical widget patterns.
  return `
    <div >
      <script src="${WANTEDLY_BASE_URL}/embed/story/${companyId}"></script>
      <!-- Paste this into your site; follow updates via Wantedly follow button -->
    </div>
  `;
}

/**
 * Generates HTML for the Authenticated Profile Addition Button.
 * @param {string} serviceId - ID of the external service (e.g., online learning platform).
 * @param {string} userId - Wantedly user ID to add to profile.
 * @param {object} options - Optional button styles or text.
 * @returns {string} HTML button code.
 */
function generateProfileButton(serviceId, userId, options = {}) {
  let buttonText, service, user
  // Requires partnership; inferred as a button linking to auth flow.
  return `
    <button onclick="addToProfile('${serviceId}', '${userId}')">
      ${buttonText}
    </button>
    <script>
      function addToProfile(service, user) {
        // Redirect to auth flow; contact ${OPEN_API_EMAIL} for integration.
        window.location.href = '${WANTEDLY_BASE_URL}/profile/add?service=${service}&user=${user}';
      }
    </script>
  `;
}

/**
 * Hypothetical GraphQL client for internal API (inferred from handbook).
 * Assumes a GraphQL endpoint for features like company search or visit requests.
 * @param {string} query - GraphQL query string.
 * @param {object} variables - Query variables.
 * @param {string} token - Auth token (OAuth or API key; not publicly detailed).
 * @returns {Promise<object>} Response data.
 */
async function queryGraphQL(query, variables = {}, token = '') {
  const endpoint = `${WANTEDLY_BASE_URL}/graphql`; // Inferred from "GraphQL Gateway" in docs.
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) throw new Error('GraphQL request failed');
    const { data, errors } = await response.json();
    if (errors) throw new Error(errors[0].message);
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    return null;
  }
}

// Example usage: Search companies (hypothetical schema based on site features)
async function searchCompanies(keyword, token) {
  const query = `
    query SearchCompanies($keyword: String!) {
      companies(search: $keyword) {
        id
        name
        description
      }
    }
  `;
  return queryGraphQL(query, { keyword }, token);
}

// Example usage: Request a visit (hypothetical)
async function requestVisit(companyId, token) {
  const mutation = `
    mutation RequestVisit($companyId: ID!) {
      createVisitRequest(companyId: $companyId) {
        id
        status
      }
    }
  `;
  return queryGraphQL(mutation, { companyId }, token);
}

module.exports = {
  generateEmbeddedStory,
  generateProfileButton,
  queryGraphQL,
  searchCompanies,
  requestVisit,
};

// Usage example in code:
// const wantedlyApi = require('./wantedly-api');
// const embed = wantedlyApi.generateEmbeddedStory('company-slug');
// console.log(embed);