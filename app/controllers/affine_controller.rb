class AffineController < ApplicationController
  # skip_before_action :verify_authenticity_token
  
  def encrypt
    user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
    a_coef = params[:aCoef].to_i
    b_coef = params[:bCoef].to_i

    if 26 % a_coef == 0
      return render json: { message: "A coefficient error" }
    end

    message = ""
  
    user_input.each_char do |char|
      encrypted_value = ((a_coef * (char.ord - 'A'.ord)) + b_coef) % 26
      message += (encrypted_value + 'A'.ord).chr
    end
  
    render json: { message: message }
  end
  
  def decrypt
    user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
    a_coef = params[:aCoef].to_i
    b_coef = params[:bCoef].to_i
    if 26 % a_coef == 0
      return render json: { message: "A coefficient error" }
    end

    message = ""
    a_inverse = calc_inverse(a_coef)
    if(a_inverse == nil)
      return render json: { message: "inverse number not found" }
    end
  
    user_input.each_char do |char|
      decrypted_value = (a_inverse * ((char.ord - 'A'.ord) - b_coef)) % 26
      message += (decrypted_value + 'A'.ord).chr
    end
  
    render json: { message: message }
  end

  private

  def calc_inverse(a_coef)
    a_inv = 0

    for i in 0..25
      calc_res = (a_coef * i) % 26
      if calc_res == 1
        a_inv = i
        break
      end
    end

    if a_inv != 0
      a_inv
    else
      puts ("inverse number not found")
    end
  end

end