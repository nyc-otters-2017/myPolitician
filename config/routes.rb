Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'maps#index'
  post 'maps/congress_tweets' => 'maps#congress_tweets'
  get 'maps/districts' => 'maps#districts'

end
