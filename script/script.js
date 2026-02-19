


const loadcategories = () => {
    fetch("https://fakestoreapi.com/products/categories")  // promise of response
        .then(res => res.json()) //promise of json data
        .then((json) => displaycategory(json));
};
const loadProductDetail = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`
    //console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayProductDetail(details);

}
const displayProductDetail = (product) => {
    console.log(product)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                    <div class="grid grid-cols-1 md: grid-cols-2 gap-8">
                        <img class="my-auto" src="${product.image}" alt="">
                        <div>
                            <p class="font-light text-sm text-sky-400">${product.category}</p>
                            <h2 class="font-bold text-xl py-5">${product.title}</h2>
                            <div class="flex items-center gap-2 mb-6">
                                <div class="flex text-amber-400">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                   <i class="fa-solid fa-half-stroke"></i>
                                </div>
                                <span class="text-sm text-gray-500 font-medium">${product.rating.rate} (${product.rating.count})</span>
                            </div>
                            <p class="font-light text-sm">${product.description}</p>
                            <div class="flex justify-between pt-5">
                                <h2 class ="">$${product.price}</h2>
                                <button class="btn btn-primary">Add To Cart</button>
                            </div>
                        </div>
                    </div>
      `;
    document.getElementById("product_modal").showModal();
};
const loadTrendingProducts = () => {
    const url = ("https://fakestoreapi.com/products");
    fetch (url)
    .then(res => res.json())
    // .then((json) => displayTrendingProducts(json))
    .then((json) => {
        const filtered = json.filter(product => product.rating.rate >= 4);
        const topThree =filtered.slice (0,3);
        // const topThree =threeProducts.slice(0,3);
        displayTrendingProducts(topThree);

    } )
   
}
const displayTrendingProducts = (products) =>{
    const container = document.getElementById("trending-container");
    container.innerHTML ="";
    products.forEach(products => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm py-10 px-5 space-y-4">
                    <p class="font-light text-sm text-sky-400">${products.category}</p>
                    <img class="w-40 h-40 mx-auto" src="${products.image}" alt="">
                    <h2 class="font-medium text-xl">${products.title}</h2>
                        <div class="flex items-center gap-2 mb-6">
                                <div class="flex text-amber-400">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                   <i class="fa-solid fa-half-stroke"></i>
                                   <i class="fa-solid fa-half-stroke"></i>
                                </div>
                                <span class="text-sm text-gray-500 font-medium">${products.rating.rate} (${products.rating.count})</span>
                        </div>
                    <div class="flex justify-between items-stretch">
                        <h1 class="font-bold text-black-400 text-2xl">$${products.price}</h1>
                        <div>
                            <button onclick="loadProductDetail(${products.id})" class="btn" href=""><i class="fa-solid fa-eye"></i></button>
                            <button class="btn" href=""><i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                    </div>
                </div>
        `;
        container.append(div);
    })
}
const loadAllProducts = () => {
    const url = ("https://fakestoreapi.com/products")
    //console.log(url)
    fetch(url)
        .then(res => res.json())
        .then((json) => displayAllProducts(json))
}
const displayAllProducts = (products) => {
    const productsContanner = document.getElementById("products-contanner");
    productsContanner.innerHTML = "";


    products.forEach((product) => {
        //console.log(product);
        const card = document.createElement("div");
        let stars = "";
        let fiveStars = 0;
        let fourStars = false;
        const rate = product.rating.rate;
        if (rate >= 1) {
            fiveStars = Math.floor(rate);

        } else {
            fiveStars = 0
        }
        if (rate - fiveStars >= 0.5) {
            fourStars = true;
        } else {
            fourStars = false;
        }
        for (let i = 0; i < fiveStars; i++) {
            stars += `<i class="fa-solid fa-star text-yellow-400"></i>`
        }
        if (fourStars === true) {
            stars += `<i class="fa-solid fa-star text-yellow-400"></i>`
        } else {

        }
        card.innerHTML = `
                <div class="bg-white rounded-xl shadow-sm py-10 px-5 space-y-4">
                    <p class="font-light text-sm text-sky-400">${product.category}</p>
                    <img class="w-40 h-40 mx-auto" src="${product.image}" alt="">
                    <h4 class="gap-1">
                       ${stars} <span class="text-gray-500">(${product.rating.count})</span>
                    </h4>
                    
                    <h2 class="font-medium text-xl">${product.title}</h2>
                    <div class="flex justify-between items-stretch">
                        
                        <h1 class="font-bold text-black-400 text-2xl">$${product.price}</h1>
                        <div>
                            <button onclick="loadProductDetail(${product.id})" class="btn" href=""><i class="fa-solid fa-eye"></i></button>
                            <button class="btn" href=""><i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                    </div>
                </div>
        `;
        loadingSpinner(false);
        productsContanner.append(card);
    })

}

const loadingSpinner=(status)=>{
    if(status === true) {
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("products-contanner").classList.add("hidden");
    } else{
        document.getElementById("products-contanner").classList.remove("hidden");
        document.getElementById("loading").classList.add("hidden");
    }
}


const loadCatgoryProducts = (category) => {
    loadingSpinner (true);
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        // fetch("https://fakestoreapi.com/products/category/${category}")
        .then(res => res.json())
        // .then(json => displayAllProducts(json));
        .then(data => displayAllProducts(data));

}
const displaycategory = (categories) => {
    //console.log(categories);
    const categoriesContanner = document.getElementById("categories-contanner");
    categoriesContanner.innerHTML = `
      <div 
      class = "flex justify-center flex-wrap gap-5 py-4" id = "btn-all" ></div>
    `;
    const btnAll = document.getElementById("btn-all");
    const allBtnDiv = document.createElement("div");
    allBtnDiv.innerHTML = `
       <button onclick = "loadAllProducts()" class="btn btn-outline btn-primary rounded-4xl">All</button>
    `;
    btnAll.append(allBtnDiv);


    for (let category of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
           
               <button onclick="loadCatgoryProducts('${category}')" class="btn btn-outline btn-primary rounded-4xl">${category}</button>
           
        `;
        btnAll.append(btnDiv)
    }
    loadingSpinner(false);
}
loadcategories();
loadAllProducts();
loadTrendingProducts();