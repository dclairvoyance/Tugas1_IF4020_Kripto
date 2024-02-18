class VigenereController < ApplicationController
  # skip_before_action :verify_authenticity_token
  
  def encrypt
    user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
    user_key = params[:userKey].to_s.upcase.gsub(/[^A-Z]/, '')
    key_index = 0
    message = ""
  
    user_input.each_char do |char|
      encrypted_value = (char.ord + user_key[key_index].ord - (2 * 'A'.ord)) % 26
      message += (encrypted_value + 'A'.ord).chr
      key_index = (key_index + 1) % user_key.length
    end
  
    render json: { message: message }
  end
  
  def decrypt
    user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
    user_key = params[:userKey].to_s.upcase.gsub(/[^A-Z]/, '')
    key_index = 0
    message = ""
  
    user_input.each_char do |char|
      decrypted_value = (char.ord - user_key[key_index].ord + 26) % 26
      message += (decrypted_value + 'A'.ord).chr
      key_index = (key_index + 1) % user_key.length
    end
  
    render json: { message: message }
  end

  def auto_encrypt
    user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
    user_key = params[:userKey].to_s.upcase.gsub(/[^A-Z]/, '')
    message = ""
    extended_key = extend_key_for_encryption(user_input, user_key)

    user_input.chars.each_with_index do |char, i|
      encrypted_value = (char.ord + extended_key[i].ord - (2 * 'A'.ord)) % 26
      message += (encrypted_value + 'A'.ord).chr
    end
    
    render json: { message: message }
  end

  def auto_decrypt
    user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
    user_key = params[:userKey].to_s.upcase.gsub(/[^A-Z]/, '')
    message = ""
    extended_key = user_key.dup

    user_input.chars.each_with_index do |char, i|
      decrypted_value = (char.ord - extended_key[i].ord + 26) % 26
      char_key = (decrypted_value + 'A'.ord).chr
      message += char_key
      extended_key += char_key
    end

    render json: { message: message }
  end

  private

  def extend_key_for_encryption(user_input, user_key)
    extended_key = user_key.dup
    if extended_key.length < user_input.length
      extended_key += user_input
    end
    
    extended_key[0...user_input.length]
  end
    
end
  