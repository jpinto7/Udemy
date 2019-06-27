class EnrollmentsController < ApplicationController
  def create
    course_to_add = Course.find(params[:course_id])
    if current_user.courses.include?(course_to_add)
      flash[:notice] = 'Something went wront with your enrollment'
      redirect_to root_path
    else
      Enrollment.create(course: course_to_add, student: current_user)
      flash[:notice] = "You have successfully enrolled in #{course_to_add.name}"
      redirect_to current_user
    end
  end
end
