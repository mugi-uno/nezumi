class AddQuestionToSample < ActiveRecord::Migration[5.1]
  def change
    add_column :samples, :q1, :integer
    add_column :samples, :q2, :integer
    add_column :samples, :q3, :integer
  end
end
