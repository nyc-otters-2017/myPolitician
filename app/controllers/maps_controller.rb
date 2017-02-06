
class MapsController < ApplicationController

  def index
  end

  def congress_tweets
    account = TwitterAccount.new(twitter_account_params)
    twitter = Twitter::REST::Client.new do |config|
      config.consumer_key = "lW2vQKfnqekJS5zQR7j2pEZIp"
      config.consumer_secret = "c9ua3PmkA6R2OGVGFGAFssguz1WFDcWo9224TOG86wBuK270hO"
      config.access_token = "827999758425923585-YJ7ZfXcH6YAczQ7FSvDPJf9uWIObSn9"
      config.access_token_secret = "NFrDtJHWY5YbIeuP4vobcim9Stu3SAPrf5IL2kzOemznV"
    end
    handle =  account.handle
    tweets = twitter.user_timeline(handle, count: 10)
    if request.xhr?
      render json: tweets
    end
  end

   private
    def twitter_account_params
        params.require(:twitter_account).permit(:handle)
    end
end
