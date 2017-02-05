class MapsController < ApplicationController

  def index
  end

  # def districts
  #   # Displays coordinates, however the file is large
  #   districts = File.read(Rails.root.join('public/NYS_Congressional_Districts.json'))
  #   render json: JSON.parse(districts)
  # end

end
