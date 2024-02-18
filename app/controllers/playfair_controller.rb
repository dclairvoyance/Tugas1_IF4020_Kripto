class PlayfairController < ApplicationController
    # skip_before_action :verify_authenticity_token
    
    def encrypt
        user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
        user_key = params[:userKey].to_s.upcase.gsub(/[^A-Z]/, '')

        # prepare key square
        user_key = user_key.gsub("J", "")
        key_square = ""
        user_key.each_char do |char|
            if !key_square.include?(char)
                key_square += char
            end
        end
        alphabet_noj = (("A".."I").to_a + ("K".."Z").to_a).join
        alphabet_noj.each_char do |char|
            if !key_square.include?(char)
                key_square += char
            end
        end

        # prepare input pairs
        user_input = user_input.gsub("J", "I")
        input_pairs = []
        i = 0
        while i <= user_input.length - 1
            if user_input[i] != user_input[i+1]
                input_pairs.push(user_input[i, 2])
                i += 2
            else
                input_pairs.push(user_input[i] + "X")
                i += 1
            end
            if i == user_input.length - 1
                input_pairs.push(user_input[i] + "X")
                i += 1
            end
        end

        # encrypt input pairs
        output_pairs = ""
        input_pairs.each do |input_pair|
            output_pairs += encrypt_pair(key_square, input_pair)
        end
    
        render json: { message: output_pairs }
    end
    
    def decrypt
        user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
        user_key = params[:userKey].to_s.upcase.gsub(/[^A-Z]/, '')

        # prepare key square
        user_key = user_key.gsub("J", "")
        key_square = ""
        user_key.each_char do |char|
            if !key_square.include?(char)
                key_square += char
            end
        end
        alphabet_noj = (("A".."I").to_a + ("K".."Z").to_a).join
        alphabet_noj.each_char do |char|
            if !key_square.include?(char)
                key_square += char
            end
        end

        # prepare input pairs
        user_input = user_input.gsub("J", "I")
        input_pairs = []
        i = 0
        while i <= user_input.length - 1
            if user_input[i] != user_input[i+1]
                input_pairs.push(user_input[i, 2])
                i += 2
            else
                input_pairs.push(user_input[i] + "X")
                i += 1
            end
            if i == user_input.length - 1
                input_pairs.push(user_input[i] + "X")
                i += 1
            end
        end

        # encrypt input pairs
        output_pairs = ""
        input_pairs.each do |input_pair|
            output_pairs += decrypt_pair(key_square, input_pair)
        end
    
        render json: { message: output_pairs }
    end

    def encrypt_pair(key_square, input_pair)
        row1, col1 = key_square.index(input_pair[0]).divmod(5)
        row2, col2 = key_square.index(input_pair[1]).divmod(5)

        output_pair = ""
        if row1 == row2
            output_pair = key_square[row1 * 5 + ((col1 + 1) % 5)] + key_square[row2 * 5 + ((col2 + 1) % 5)]
        elsif col1 == col2
            output_pair = key_square[((row1 + 1) % 5) * 5 + col1] + key_square[((row2 + 1) % 5) * 5 + col2]
        else
            output_pair = key_square[row1 * 5 + col2] + key_square[row2 * 5 + col1]
        end
        output_pair
    end

    def decrypt_pair(key_square, input_pair)
        row1, col1 = key_square.index(input_pair[0]).divmod(5)
        row2, col2 = key_square.index(input_pair[1]).divmod(5)

        output_pair = ""
        if row1 == row2
            output_pair = key_square[row1 * 5 + ((col1 - 1) % 5)] + key_square[row2 * 5 + ((col2 - 1) % 5)]
        elsif col1 == col2
            output_pair = key_square[((row1 - 1) % 5) * 5 + col1] + key_square[((row2 - 1) % 5) * 5 + col2]
        else
            output_pair = key_square[row1 * 5 + col2] + key_square[row2 * 5 + col1]
        end
        output_pair
    end
  
    private


end
    