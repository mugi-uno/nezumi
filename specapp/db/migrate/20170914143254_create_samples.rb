class CreateSamples < ActiveRecord::Migration[5.1]
  def change
    create_table :samples do |t|
      t.string :name
      t.string :age
      t.string :textarea

      t.timestamps
    end
  end
end
