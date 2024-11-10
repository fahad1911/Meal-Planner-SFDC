/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 11-10-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public class RecipeController {
    @AuraEnabled
    public static void saveRecipeWithIngredients(String recipeData) {
        // Parse JSON to get Recipe and Ingredients data
        Map<String, Object> recipeMap = (Map<String, Object>) JSON.deserializeUntyped(recipeData);
        
        Recipe__c recipe = new Recipe__c();
        recipe.Name = (String) recipeMap.get('name');
        recipe.Description__c = (String) recipeMap.get('description');
        recipe.Cooking_Time__c = Integer.valueOf((String) recipeMap.get('cookingTime'));
        
        // Insert Recipe
        insert recipe;
        
        // Insert Ingredients associated with this Recipe
        List<Ingredient__c> ingredients = new List<Ingredient__c>();
        List<Map<String, Object>> ingredientMaps = (List<Map<String, Object>>) recipeMap.get('ingredients');
        
        for (Map<String, Object> ingredientMap : ingredientMaps) {
            Ingredient__c ingredient = new Ingredient__c();
            ingredient.Name = (String) ingredientMap.get('name');
            ingredient.Quantity__c = Decimal.valueOf((String) ingredientMap.get('quantity'));
            ingredient.Unit__c = (String) ingredientMap.get('unit');
            ingredient.Recipe__c = recipe.Id;
            ingredients.add(ingredient);
        }
        
        // Insert Ingredients
        insert ingredients;
    }
}
