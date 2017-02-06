class TwitterAccount < ApplicationRecord
   validates_uniqueness_of :handle 
end
