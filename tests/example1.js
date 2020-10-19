import { Selector, t } from "testcafe";

fixture `Few simple tests using testcafe to demo pipeline`
    .page `http://automationpractice.com/index.php`;

// Test Site existing account creds
const EMAIL = "testmail526@gmail.com";
const PASSWORD = "testing123";

// Helpers
async function searchFor(inText){
    const searchBar = Selector("#search_query_top");

    await t
    .typeText(searchBar, inText)
    .click("[name=submit_search");
};

async function login(email, password){
    const loginBtn = Selector(".login");
    const emailInput = Selector("#email");
    const passwordInput = Selector("#passwd");

    await t
    .click(loginBtn)
    .typeText(emailInput, email)
    .typeText(passwordInput, password)
    .click("#SubmitLogin");
};

async function addFirstToCart(){
    const product = Selector(".ajax_block_product").find(".right-block").find(".product-name");
    const addToCartBtn = Selector("#add_to_cart").find("button");
    const proceed = Selector("#layer_cart").find("[title='Proceed to checkout']");

    await t
    .click(product)
    .click(addToCartBtn)
    .click(proceed);
};

// Tests
test("Search for 't-shirt'" , async t => {
    const listSize = Selector(".ajax_block_product").count;

    await searchFor("t-shirt");
    await t
    .expect(listSize).eql(1);
});

test("Login to account", async t => {
    const header = Selector(".header_user_info");

    await login(EMAIL, PASSWORD);
    await t
    .expect(header.count).eql(2)
    .expect(header.nth(0).find('a').getAttribute("class")).eql("account");
});

test("Login, Search for t-shirt, and Add to cart", async t => {
    const productSummary = Selector("#summary_products_quantity").textContent;

    await login(EMAIL, PASSWORD);
    await searchFor("t-shirt");
    await addFirstToCart();
    await t
    .expect(productSummary).eql("1 Product");
});