import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { useState } from "react"
import { createDataSet } from "./data/dataset"
import "./App.css"
import Header from "./components/Header/Header"
import Instructions from "./components/Instructions/Instructions"
import Chip from "./components/Chip/Chip"
import NutritionalLabel, { NutritionalLabelFact } from "./components/NutritionalLabel/NutritionalLabel"
// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()


export function App() {
  const [selectedRestaurant, setRestaurant] = useState()
  const [selectedCategory, setCategory] = useState()
  const [selectedMenuItem, setSelectedMenuItem] = useState()

  const currentMenuItems = data.filter(item => { return (item.food_category == selectedCategory && item.restaurant == selectedRestaurant) })

  function getInstructionStatus(stateRestaurant, stateCategory, stateSelected) {
    if (!stateRestaurant && !stateCategory && !stateSelected) {
      return appInfo.instructions.start
    }
    else if (stateRestaurant && !stateCategory && !stateSelected) {
      return appInfo.instructions.onlyRestaurant
    }
    else if (!stateRestaurant && stateCategory && !stateSelected) {
      return appInfo.instructions.onlyCategory
    }
    else if (stateRestaurant && stateCategory && !stateSelected) {
      return appInfo.instructions.noSelectedItem
    }
    else {
      return appInfo.instructions.allSelected
    }
  }

  return ( // rerendered when state variable is changed
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((cat, index) => {
            let active = (cat == selectedCategory ? true : false)
            return (<Chip label={cat} key={index} isActive={active} onClick={() => {
              setCategory(cat)
              console.log(`Clicked Category is: ${cat}`) // ex. "Entree"
              console.log(`State Category is: ${selectedCategory}`) // undefined 
            }} onClose={(e) => {
              console.log("CLOSED")
              e.stopPropagation()
              setCategory()
            }}/>)
          }
          )}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description}  />

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">{restaurants.map((rest, index) => {
            let active = (rest == selectedRestaurant ? true : false)
            return (<Chip label={rest} key={index} isActive={active} onClick={() => {
              setRestaurant(rest)
              console.log(`Clicked Restaurant is: ${rest}`)
              console.log(`State Restaurant is: ${selectedRestaurant}`)
            }} onClose={(e) => {
              console.log("CLOSED")
              e.stopPropagation()
              setRestaurant()
            }} />)
          }
          )}</div>
        </div>

         <Instructions instructions={getInstructionStatus(selectedRestaurant, selectedCategory, selectedMenuItem)} />

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            <div className="menu-items">
              {console.log("Displaying currentMenuItems")}
              {currentMenuItems.map((menuItem, index) => {
                return (<Chip className="menu-items" label={menuItem.item_name} key={index} onClick={() => {
                  setSelectedMenuItem(menuItem)
                  console.log(`Selected Menu Item is ${menuItem}`)
                  console.log(`State Menu Item is ${selectedMenuItem}`)
                }} />)
              })}
            </div>
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {selectedMenuItem ? (<NutritionalLabel item={selectedMenuItem}/>) : console.log("No item selected")}
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
