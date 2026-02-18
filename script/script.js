const loadTrendingProduct = async (id) =>{
 const url = `https://fakestoreapi.com/products/category/${category}`;
 console.log(url);
 const data = await fetch (url);
    const res = await res.json();
    console.log(data);
    //displayWordDetails(details.data);
};
console.log(data);