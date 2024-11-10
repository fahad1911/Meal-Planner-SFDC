import { LightningElement, track } from 'lwc';
import saveRecipeWithIngredients from '@salesforce/apex/RecipeController.saveRecipeWithIngredients';

export default class RecipeForm extends LightningElement {
    // Track state for recipe details and ingredients
    @track recipeName = '';
    @track description = '';
    @track cookingTime = '';
    @track ingredients = [];

    // Handlers for Recipe fields
    handleRecipeNameChange(event) {
        this.recipeName = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    handleCookingTimeChange(event) {
        this.cookingTime = event.target.value;
    }

    // Ingredient management
    addIngredient() {
        this.ingredients = [...this.ingredients, { id: Date.now(), name: '', quantity: '', unit: '' }];
    }

    handleIngredientNameChange(event) {
        const id = event.target.dataset.id;
        this.updateIngredientField(id, 'name', event.target.value);
    }

    handleIngredientQuantityChange(event) {
        const id = event.target.dataset.id;
        this.updateIngredientField(id, 'quantity', event.target.value);
    }

    handleIngredientUnitChange(event) {
        const id = event.target.dataset.id;
        this.updateIngredientField(id, 'unit', event.target.value);
    }

    updateIngredientField(id, field, value) {
        this.ingredients = this.ingredients.map(ingredient => {
            return ingredient.id === parseInt(id) ? { ...ingredient, [field]: value } : ingredient;
        });
    }

    removeIngredient(event) {
        const id = event.target.dataset.id;
        this.ingredients = this.ingredients.filter(ingredient => ingredient.id !== parseInt(id));
    }

    // Save Recipe with Ingredients
    saveRecipe() {
        // Build payload and call Apex method
        const recipe = {
            name: this.recipeName,
            description: this.description,
            cookingTime: this.cookingTime,
            ingredients: this.ingredients
        };
        
        saveRecipeWithIngredients({ recipeData: JSON.stringify(recipe) })
            .then(() => {
                // Clear form fields
                this.recipeName = '';
                this.description = '';
                this.cookingTime = '';
                this.ingredients = [];
                alert('Recipe saved successfully!');
            })
            .catch(error => {
                console.error('Error saving recipe:', error);
                alert('Failed to save the recipe.');
            });
    }
}
