
const getPaginationOpts = (query)=>{

  const page = query.page ? parseInt(query.page): 1;
  const perpage = query.perpage ? parseInt(query.perpage): 10;
  return {
    page: page,
    perpage: perpage,
    skip: (page-1)* perpage
  }
}



export {
  getPaginationOpts
}