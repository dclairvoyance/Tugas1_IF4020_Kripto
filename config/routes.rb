Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :ciphers
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  Rails.application.routes.draw do
    post '/vigenere_encrypt', to: 'vigenere#encrypt'
    post '/vigenere_decrypt', to: 'vigenere#decrypt'
    post '/vigenere_auto_encrypt', to: 'vigenere#auto_encrypt'
    post '/vigenere_auto_decrypt', to: 'vigenere#auto_decrypt'
    post '/affine_encrypt', to: 'affine#encrypt'
    post '/affine_decrypt', to: 'affine#decrypt'
    post '/hill_encrypt', to: 'hill#encrypt'
    post '/hill_decrypt', to: 'hill#decrypt'
  end
end
