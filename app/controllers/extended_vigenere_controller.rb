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
    uploaded_file = params[:file].tempfile
    filename = params[:file].original_filename
    user_input = File.binread(uploaded_file)
    user_key = params[:userKey].to_s
    key_index = 0
    message = ""
  
    user_input.each_char do |char|
      encrypted_value = (char.ord + user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end
    send_data message, type: 'application/octet-stream', disposition: 'attachment'

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

    encoded_message = Base64.strict_encode64(message)
    render json: { message: encoded_message }
  end

  def file_decrypt
    uploaded_file = params[:file].tempfile
    filename = params[:file].original_filename
    user_input = File.binread(uploaded_file)
    user_key = params[:userKey].to_s
    key_index = 0
    message = ""
  
    user_input.each_char do |char|
      encrypted_value = (char.ord - user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end
    send_data message, type: 'application/octet-stream', disposition: 'attachment'
  end

end