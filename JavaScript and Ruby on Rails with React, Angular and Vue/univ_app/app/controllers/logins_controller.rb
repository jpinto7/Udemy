class LoginsController < ApplicationController
  skip_before_action :require_user, only: [:new, :create]

  def new
  end

  def create
    student = Student.find_by(email: params[:logins][:email].downcase)
    if student && student.authenticate(params[:logins][:password])
      session[:student_id] = student.id
      flash[:notice] = 'You have successfully logged in'
      redirect_to student
    else
      flash.now[:notice] = 'Please review your login information'
      render 'new'
    end
  end

  def destroy
    if session[:student_id]
      session[:student_id] = nil
      flash[:notice] = 'You have successfully logged out'
      redirect_to root_path
    end
  end
end
