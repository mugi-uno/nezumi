class AddDrinkToSample < ActiveRecord::Migration[5.1]
  def change
    add_column :samples, :drink, :string
  end
end
