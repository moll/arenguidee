class RemoveRememberTokenFromUsers < ActiveRecord::Migration
  def up
    remove_column :users, :remember_token
    remove_column :users, :remember_token_expires_at
  end

  def down
    add_column :users, :remember_token, :string, :limit => 60
    add_column :users, :remember_token_expires_at, :datetime
  end
end
