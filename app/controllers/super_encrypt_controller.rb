require 'base64'

class SuperEncryptController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def encrypt
    user_input = params[:userInput].to_s
    user_key = params[:userKey].to_s
    num_cols = params[:numCols].to_i
    key_index = 0
    message = ""
  
    padding_length = (num_cols - (user_input.length % num_cols)) % num_cols
    user_input = user_input + 'Z' * padding_length

    user_input.each_char do |char|
      encrypted_value = (char.ord + user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end

    split_text = message.scan(/.{1,#{num_cols}}/m)
    grid = split_text.map { |row| row.chars }
    grid_result = grid.transpose

    transpose_message = ""
    grid_result.each do |row|
      transpose_message += row.join('')
    end

    encoded_message = Base64.strict_encode64(transpose_message)
    puts(encoded_message)
    render json: { message: encoded_message }
  end

  def file_encrypt
    uploaded_file = params[:file].tempfile
    filename = params[:file].original_filename
    user_input = File.binread(uploaded_file)
    user_key = params[:userKey].to_s
    num_cols = params[:numCols].to_i
    key_index = 0
    message = ""

    padding_length = (num_cols - (user_input.length % num_cols)) % num_cols
    user_input = user_input + "\x00" * padding_length
  
    user_input.each_char do |char|
      encrypted_value = (char.ord + user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end

    split_text = message.scan(/.{1,#{num_cols}}/m)
    grid = split_text.map { |row| row.chars }
    grid_result = grid.transpose

    transpose_message = ""
    grid_result.each do |row|
      transpose_message += row.join('')
    end

    send_data transpose_message, type: 'application/octet-stream', disposition: 'attachment'
  end

  def decrypt
    user_input = params[:userInput].to_s
    user_key = params[:userKey].to_s
    num_cols = params[:numCols].to_i
    key_index = 0
    message = ""

    num_rows = user_input.length / num_cols
    split_text = user_input.scan(/.{1,#{num_rows}}/m)
    grid = split_text.map { |row| row.chars }
    grid_result = grid.transpose

    transpose_input = ""
    grid_result.each do |row|
      transpose_input += row.join('')
    end
  
    transpose_input.each_char do |char|
      encrypted_value = (char.ord - user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end
  
    encoded_message = Base64.strict_encode64(message)
    puts(encoded_message)
    render json: { message: encoded_message }
  end

  def file_decrypt
    uploaded_file = params[:file].tempfile
    filename = params[:file].original_filename
    user_input = File.binread(uploaded_file)
    user_key = params[:userKey].to_s
    num_cols = params[:numCols].to_i
    key_index = 0
    message = ""

    num_rows = user_input.length / num_cols
    split_text = user_input.scan(/.{1,#{num_rows}}/m)
    grid = split_text.map { |row| row.chars }
    grid_result = grid.transpose

    transpose_input = ""
    grid_result.each do |row|
      transpose_input += row.join('')
    end
  
    transpose_input.each_char do |char|
      encrypted_value = (char.ord - user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end
    
    message = message.gsub(/\x00+$/, '')
    send_data message, type: 'application/octet-stream', disposition: 'attachment'
  end

end