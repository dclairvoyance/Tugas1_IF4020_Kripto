require 'matrix'

class HillController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def encrypt
    user_input = params[:userInput].to_s.upcase.gsub(/\s+/, '')
    size = params[:size].to_i
    cipher_matrix_input = params[:cipherMatrix].to_s.split(' ').map(&:to_i).each_slice(size).to_a
    cipher_matrix = Matrix[*cipher_matrix_input]
    message = ""
    padding_length = (size - (user_input.length % size)) % size
    input_padded = user_input + 'Z' * padding_length
  
    input_padded.each_char.each_slice(size) do |slice|
      numeric_slice = slice.map { |char| char.ord - 'A'.ord }
      input_matrix = Matrix.column_vector(numeric_slice)
      calc_matrix = cipher_matrix * input_matrix
      result_matrix = calc_matrix.map { |e| e % 26 }
      string_result = result_matrix.to_a.flatten.map { |e| (e + 'A'.ord).chr }.join
      message += string_result
    end
  
    render json: { message: message }
  end
  
  def decrypt
    user_input = params[:userInput].to_s.upcase.gsub(/\s+/, '')
    size = params[:size].to_i
    cipher_matrix_input = params[:cipherMatrix].to_s.split(' ').map(&:to_i).each_slice(size).to_a
    cipher_matrix = Matrix[*cipher_matrix_input]
    cipher_matrix_processed = matrix_mod_inverse(cipher_matrix)
    message = ""
    padding_length = (size - (user_input.length % size)) % size
    input_padded = user_input + 'Z' * padding_length
  
    input_padded.each_char.each_slice(size) do |slice|
      numeric_slice = slice.map { |char| char.ord - 'A'.ord }
      input_matrix = Matrix.column_vector(numeric_slice)
      calc_matrix = cipher_matrix_processed * input_matrix
      result_matrix = calc_matrix.map { |e| e % 26 }
      string_result = result_matrix.to_a.flatten.map { |e| (e + 'A'.ord).chr }.join
      message += string_result
    end
  
    render json: { message: message }
  end

  private

  def mod_inv(a)
    a %= 26
    for x in 0...26
      if (a * x) % 26 == 1
        return x
      end
    end
    nil  
  end
  
  def cofactor_matrix(cipher_matrix)
    size = cipher_matrix.row_size
    cofactor = Matrix.build(size, size) do |row, col|
      minor_matrix = cipher_matrix.to_a
      minor_matrix.delete_at(row)
      minor_matrix.each { |r| r.delete_at(col) }
      minor = Matrix[*minor_matrix]

      det = minor.determinant
      ((-1) ** (row + col)) * det.round
    end
    cofactor
  end
  
  def matrix_mod_inverse(cipher_matrix)
    det = cipher_matrix.determinant.round
    det_inv = mod_inv(det)
  
    raise "The determinant #{det} has no inverse modulo #{26}." if det_inv.nil?
  
    cofactor = cofactor_matrix(cipher_matrix)
    adjugate = cofactor.transpose
    inverse_matrix = (adjugate * det_inv).map { |e| e % 26 }
    inverse_matrix
  end

end