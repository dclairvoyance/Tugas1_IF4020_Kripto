require 'base64'

class ExtendedVigenereController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def encrypt
    user_input = params[:userInput].to_s
    user_key = params[:userKey].to_s
    key_index = 0
    message = ""
  
    user_input.each_char do |char|
      encrypted_value = (char.ord + user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end
    encoded_message = Base64.strict_encode64(message)
    render json: { message: encoded_message }
  end

  def file_encrypt
    user_input = params[:userInput].to_s
    user_input = user_input.slice(23, user_input.length)
    user_input = Base64.decode64(user_input)
    user_key = params[:userKey].to_s
    key_index = 0
    message = ""

    puts user_input
  
    user_input.each_char do |char|
      encrypted_value = (char.ord + user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end
    
    encoded_message = Base64.strict_encode64(message)
    render json: { message: encoded_message }
  end

  def decrypt
    user_input = params[:userInput].to_s
    user_key = params[:userKey].to_s
    key_index = 0
    message = ""
  
    user_input.each_char do |char|
      encrypted_value = (char.ord - user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end
  
    puts message
    render json: { message: message }
  end

  def file_decrypt
    user_input = params[:userInput].to_s
    user_input = user_input.slice(23, user_input.length)
    user_input = Base64.decode64(user_input)
    user_key = params[:userKey].to_s
    key_index = 0
    message = ""

    puts user_input
  
    user_input.each_char do |char|
      encrypted_value = (char.ord - user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end

    puts message

    encoded_message = Base64.strict_encode64(message)
    render json: { message: encoded_message }
  end

end