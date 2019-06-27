class CoursesController < ApplicationController
  skip_before_action :require_user, only: [:index]

  def index
    @courses = Course.all
  end

  def new
  end

  def enroll
  end
end
