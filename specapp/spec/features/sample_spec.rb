require 'spec_helper'

RSpec.describe 'Sample' do
  describe 'forms' do
    before do
      visit('/sample')
    end

    it 'sample specs' do
      find_by_id('sample_name').click
      fill_in 'Name', with: 'name'
      fill_in 'Age', with: 'age'
      fill_in 'Textarea', with: "hoge\npiyo\nfuga"
      fill_in 'idform', with: 'idform'
      find('.foo.bar.baz').set('classform')
      find(:xpath, 'id("new_sample")/div[6]/input[1]').set('xpathform')
      find_by_id('sample_food_a').click
      choose 'Apple'
      find_by_id('sample_food_o').click
      choose 'Orange'
      find_by_id('sample_food_p').click
      choose 'Peach'
      find_by_id('radio1').click
      choose 'radio1'
      find_by_id('radio1').click
      find('.radio2').click
      find('.radio2').set(true)
      find(:xpath, 'id("new_sample")/div[8]/input[3]').click
      find(:xpath, 'id("new_sample")/div[8]/input[3]').set(true)
      find_by_id('sample_q1').click
      check 'Question1'
      find_by_id('sample_q2').click
      check 'Question2'
      find_by_id('sample_q3').click
      check 'Question3'
      find_by_id('check1').click
      check 'check1'
      find('.check2').click
      find('.check2').set(true)
      find(:xpath, 'id("new_sample")/div[10]/input[3]').click
      find(:xpath, 'id("new_sample")/div[10]/input[3]').set(true)
      find(:xpath, 'id("new_sample")/div[10]/input[3]').click
      find(:xpath, 'id("new_sample")/div[10]/input[3]').set(false)
      find_by_id('sample_q2').click
      uncheck 'Question2'
      find_by_id('check1').click
      uncheck 'check1'
      select '紅茶', from: 'Drink'
      select '牛乳', from: 'select1'
      find('.select2').find(:option, 'コーヒー').select_option
      find(:xpath, 'id("new_sample")/div[12]/select[3]').find(:option, '紅茶').select_option
      select '', from: 'Drink'
      click_link 'sample button'
      click_link 'linkid'
      find('.linkclass').click
      find(:xpath, 'id("new_sample")/div[13]/a[4]').click
      click_button 'sample button'
      click_button 'buttonid'
      find('.buttonclass').click
      find(:xpath, 'id("new_sample")/div[14]/button[4]').click
      find('.btn.btn-large.btn-primary').click
    end
  end
end
