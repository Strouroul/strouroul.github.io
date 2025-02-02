const dataSet = [
  {
    "name":"Joan",
    "district":"Kampala",
    "gender":"Female"
  },
    {
    "name":"Joseph",
    "district":"Masaka",
    "gender":"Male"
  },
    {
    "name":"Janet",
    "district":"Kampala",
    "gender":"Female"
  },
    {
    "name":"Jerrico",
    "district":"Mubende",
    "gender":"Male"
  },
    {
    "name":"John",
    "district":"Mityana",
    "gender":"Male"
  },
   {
    "name":"Julliet",
    "district":"Kampala",
    "gender":"Female"
  }
]

const displayPageNav = perPage => {
  
  let pagination =``
  const totalItems = dataSet.length
  perPage = perPage ? perPage : 1
  const pages = Math.ceil(totalItems/perPage)
  
  for(let i = 1; i <= pages; i++) {
    pagination += `<a href="#" onClick="displayItems(${i},${perPage})" >${i}</a>`
  }

  document.getElementById('pagination').innerHTML = pagination
  
}

const displayItems = ( page = 1, perPage = 2 ) => {
  
 let index, offSet
  
  if(page == 1 || page <=0)  {
    index = 0
    offSet = perPage
  } else if(page > dataSet.length) {
    index = page - 1
    offSet = dataSet.length
  } else {
    index = page * perPage - perPage
    offSet = index + perPage
  }
  
  const slicedItems = dataSet.slice(index, offSet)
  
  const html = slicedItems.map(item => 
   `<tr>
      <td>${item.name}</td>
      <td>${item.gender}</td>
      <td>${item.district}</td>
    </tr>`)
  
  document.querySelector('#container tbody').innerHTML = html.join('')
 
}

let perPage = 5
displayPageNav(perPage)
displayItems(1, perPage)