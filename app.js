var randomImage = document.getElementById("randomImage")
var randomName = document.getElementById("randomName")
var closeimg = document.getElementById("close")
const changeBtn = document.getElementById("changeBtn")
const homeBtn = document.getElementById("homeBtn")
var ingredientBox = document.getElementById("ingredientBox")
var inputBox = document.getElementById("inputBox")
const footie = document.getElementById("footer")
var url = "https://www.themealdb.com/api/json/v1/1/random.php"

// async function getWeather(){
//       try{
//         let res = await fetch(url)
//         let data=await res.json()
//         console.log(data)
//       }catch(error){
//         console.log("error:", error)
//       }
// }

// getWeather()

ingredientBox.style.display = "none";
closeimg.style.display = "none";
footie.style.display = "none";

    const randomDish = () =>{           //setting up random meal//
        fetch (url)
        .then((response) => response.json())
        .then((res) => {
            res.meals.forEach(element => {
                randomImage.src = element.strMealThumb;
                randomName.textContent = element.strMeal;
                findingIngredients();
            });
        })  

    }

changeBtn.onclick = () => randomDish()              // for each click on change button the random dish will change//
window.onload = () => randomDish()                  //even refreshing page the random dish changes//

      var findingIngredients = () =>{

      fetch(url)
          .then(response => {
          if (response.ok) {
          return response.json();
          } 
          else {
          throw new Error("Not found");
          }
          })
          .then(data => {
          const ingredients = [];
          const meals = data.meals;
          if (meals) {
             meals.forEach(element => {
             for (let i = 1; i <= 20; i++) {
                const ingredient = element[`strIngredient${i}`];
                if (ingredient) {
                  ingredients.push(ingredient);
                  ingredientBox.textContent=ingredients;
                  ingredientBox.innerHTML = "";
                  ingredients.forEach(el =>{
                  var ingredient = document.createElement("ol")   // getting ingredients in oderlist //
                  ingredient.textContent = el                    
                  ingredientBox.append(ingredient)
                      })
                    }
                  }
                });
              }
            })
            .catch(error => {
            console.error(error);
              });
            }

        closeimg.onclick = () =>{
        ingredientBox.style.display = "none";
        closeimg.style.display = "none";
       }     

   randomImage.onclick = ()=>{
   ingredientBox.style.display  = "block";
   closeimg.style.display = "block";
 }


 

function input(inputvalue){
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`)  //fetching the Search meal by name api //
  .then((response) => response.json())
  .then((res)=>{
        SearchResultCard(res)  
        })
      }

function SearchResultCard(arrays){    //making searched items images//
    results.innerHTML = "";
    arrays.meals.forEach(array => {                 //creating a div for searched meals//
      results.innerHTML+=`<div class="meal">            
      <img class="mealimg" src=${array.strMealThumb}>
      <h3>${array.strMeal}</h3> </div>`
    });
    let arr=document.getElementsByClassName('meal')
    for(let i=0;i<arr.length;i++){
      arr[i].onclick=()=>{
        console.log('yes')
        findingIngredients()
        ingredientBox.style.display  = "block";
        closeimg.style.display = "block";
      }
    }
    
  }

document.addEventListener('keypress',(event)=>{         //getting input and searching it by pressing enter key in keybord//
  if(event.key=='Enter'){
    const meal  = inputBox.value;
    input(meal)
    results.innerHTML=`Search Results for "${meal}"`;
    footie.style.display = "block";

  }
})



