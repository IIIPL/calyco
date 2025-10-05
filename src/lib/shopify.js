import { SHOP_DOMAIN, SHOP_TOKEN, SHOPIFY_READY } from './env';

export { SHOPIFY_READY };

const API_VERSION = '2024-07';

function getGraphQLEndpoint() {
  return `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`;
}

async function shopifyGraphQL(query, variables = {}) {
  if (!SHOPIFY_READY) {
    throw new Error('Shopify env not configured');
  }

  const response = await fetch(getGraphQLEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOP_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Shopify GraphQL error: ${response.status} ${response.statusText}`);
  }

  if (json.errors?.length) {
    const messages = json.errors.map((err) => err.message).join(' | ');
    throw new Error(`Shopify GraphQL errors: ${messages}`);
  }

  return json.data;
}

export async function createCart({ lines, note, buyerIdentity, discountCodes } = {}) {
  const mutation = `mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
        code
      }
    }
  }`;

  const input = {
    lines,
  };

  if (note) input.note = note;
  if (buyerIdentity) input.buyerIdentity = buyerIdentity;
  if (discountCodes?.length) input.discountCodes = discountCodes;

  const data = await shopifyGraphQL(mutation, { input });
  const { cartCreate } = data || {};

  if (!cartCreate) {
    throw new Error('Shopify cartCreate returned no data');
  }

  if (cartCreate.userErrors?.length) {
    const messages = cartCreate.userErrors.map((err) => err.message).join(' | ');
    const error = new Error(messages || 'Unknown Shopify cart error');
    error.userErrors = cartCreate.userErrors;
    throw error;
  }

  return cartCreate.cart;
}
