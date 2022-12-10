export const addFeedData=(data)=>{
    const updatedData={...data}
    updatedData.Title = {
        ...updatedData.Title,
        value: "",
      };
      updatedData.Category = {
        ...updatedData.Category,
        value: "",
      };
      updatedData.Content = {
        ...updatedData.Content,
        value: "",
      };
      return updatedData;
}