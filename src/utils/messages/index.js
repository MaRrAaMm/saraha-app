const generateMessage = (entity) =>({
        notFound: `${entity} not found`,
        alreadyExist:`${entity} already exist`,
        createdSuccessfully : `${entity} created succcessfully`,
        updatedSuccessfully : `${entity} updated succcessfully`,
        deletedSuccessfully : `${entity} deleted succcessfully`,
        failToCreate : `fail to create ${entity}`,
        failToUpdate : `fail to update ${entity}`,
        failToDelete : `fail to delete ${entity}`,
});
export const message={
    user: {...generateMessage("user"), incorrectPassword:"incorrect password"},
    message:generateMessage("message"),
    product: generateMessage("product"),
    category: generateMessage("category"),
    brand: generateMessage("brand")
};