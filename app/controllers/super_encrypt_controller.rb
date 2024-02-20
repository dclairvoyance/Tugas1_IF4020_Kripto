require 'base64'

class SuperEncryptController < ApplicationController

  def encrypt
    user_input = params[:userInput].to_s
    user_key = params[:userKey].to_s
    num_cols = params[:numCols].to_i
    key_index = 0
    message = ""
  
    padding_length = (num_cols - (user_input.length % num_cols)) % num_cols
    user_input = user_input + "Z" * padding_length

    user_input.each_char do |char|
      encrypted_value = (char.ord + user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end

    transpose_message = ""
    i = 0
    while (i < num_cols)
      j = 0
      while(i+j < message.length)
        position = i+j
        transpose_message += message[position]
        j+= num_cols
      end
      i+=1
    end

    encoded_message = Base64.strict_encode64(transpose_message)
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
    user_input = user_input + "Z" * padding_length

    user_input.each_char do |char|
      encrypted_value = (char.ord + user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end

    transpose_message = ""
    i = 0
    while (i < num_cols)
      j = 0
      while(i+j < message.length)
        position = i+j
        transpose_message += message[position]
        j+= num_cols
      end
      i+=1
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
    transpose_input = ""
    i = 0
    while (i < num_rows)
      j = 0
      while(i+j < user_input.length)
        position = i+j
        transpose_input += user_input[position]
        j+= num_rows
      end
      i+=1
    end
  
    transpose_input.each_char do |char|
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
    num_cols = params[:numCols].to_i
    key_index = 0
    message = ""

    num_rows = user_input.length / num_cols
    transpose_input = ""
    i = 0
    while (i < num_rows)
      j = 0
      while(i+j < user_input.length)
        position = i+j
        transpose_input += user_input[position]
        j+= num_rows
      end
      i+=1
    end

    transpose_input.each_char do |char|
      encrypted_value = (char.ord - user_key[key_index].ord) % 256
      message += (encrypted_value).chr
      key_index = (key_index + 1) % user_key.length
    end

    send_data message, type: 'application/octet-stream', disposition: 'attachment'
  end

end