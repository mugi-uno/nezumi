class AddFoodToSample < ActiveRecord::Migration[5.1]
  def change
    add_column :samples, :food, :string
  end
end
