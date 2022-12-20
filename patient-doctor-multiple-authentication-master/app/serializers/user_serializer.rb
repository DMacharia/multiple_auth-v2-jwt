class UserSerializer < ActiveModel::Serializer
  attributes :username, :email , :roles
end
