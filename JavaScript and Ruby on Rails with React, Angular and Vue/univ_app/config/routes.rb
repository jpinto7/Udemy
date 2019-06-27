Rails.application.routes.draw do
  root 'courses#index'
  get 'courses/new'
  post 'new_enrollment', to: 'enrollments#create'
  get 'about', to: 'pages#about'
  resources :students, except: [:destroy]
  get 'login', to: 'logins#new'
  post 'login', to: 'logins#create'
  delete 'logout', to: 'logins#destroy'
end
