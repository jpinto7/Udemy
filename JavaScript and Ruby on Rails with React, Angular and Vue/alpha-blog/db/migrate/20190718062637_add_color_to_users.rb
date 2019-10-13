class AddColorToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :color, :text
  end
end
