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
    post '/enigma_encrypt', to: 'enigma#encrypt'
    post '/enigma_decrypt', to: 'enigma#decrypt'
    post '/playfair_encrypt', to: 'playfair#encrypt'
    post '/playfair_decrypt', to: 'playfair#decrypt'
    post '/extended_vigenere_encrypt', to: 'extended_vigenere#encrypt'
    post '/extended_vigenere_decrypt', to: 'extended_vigenere#decrypt'
    post '/extended_vigenere_file_encrypt', to: 'extended_vigenere#file_encrypt'
    post '/extended_vigenere_file_decrypt', to: 'extended_vigenere#file_decrypt'
    post '/super_encrypt', to: 'super_encrypt#encrypt'
    post '/super_decrypt', to: 'super_encrypt#decrypt'
    post '/super_file_encrypt', to: 'super_encrypt#file_encrypt'
    post '/super_file_decrypt', to: 'super_encrypt#file_decrypt'
  end
end
