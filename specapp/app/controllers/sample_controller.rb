class SampleController < ApplicationController
  def sample
    @sample = Sample.new
  end
end
